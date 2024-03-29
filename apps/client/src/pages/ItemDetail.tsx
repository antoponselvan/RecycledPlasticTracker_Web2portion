// @ts-nocheck 
import {Row, Col, Container, Form} from "react-bootstrap"
import {faSquareCheck, faSquareXmark} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import {useState, useEffect} from "react"
import { useParams } from "react-router-dom"

import * as web3 from '@solana/web3.js'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { RePlasticTracker } from '../data/re_plastic_tracker'
import * as smpIdl from '../data/re_plastic_tracker.json';
import * as anchor from "@project-serum/anchor";
import {  WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import { NodeWallet } from '@metaplex/js';

const RE_PLASTIC_TRACKER_PROGRAM_ID = "CnBe9kijpRjNv5ts2iUCKDGaZmoFVhtLTDTb1R7VSWDT"

const ItemDetail = () => {
  const [itemDetail, setItemDetail] = useState({product:{},manufacturer:{},purchaser:{}})
  const [itemDetailSolana, setItemDetailSolana] = useState({
    manufacturerKey:"", serialNum:"", rePlasticPct:0, purchaserKey:""
  })
  let params = useParams()
  const productId = params.productId

  const { connection} = useConnection();
  const wallet = new NodeWallet(anchor.web3.Keypair.generate())
  // const wallet = useAnchorWallet()

  const getDataFromSolana = async (manufacturerKey, serialNum) => {
    // if (!wallet?.publicKey) {
    //   alert("Cannot Connect to Solana")
    //   return};
    const smpClient = new anchor.Program<RePlasticTracker>(
          smpIdl as any,
          new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID),
          new anchor.AnchorProvider(
              connection,
              wallet,
              anchor.AnchorProvider.defaultOptions()
          )
      )
    const manufacturerKeyClass = new web3.PublicKey(manufacturerKey);
    // console.log(manufacturerPubKey.toBuffer())
    // console.log(wallet.publicKey.toBuffer())
    // manufacturerPubKey
    try{
      const [pda] = await web3.PublicKey.findProgramAddress(
            [
                manufacturerKeyClass.toBuffer(),
                Buffer.from(anchor.utils.bytes.utf8.encode(serialNum))
            ],
            new web3.PublicKey(RE_PLASTIC_TRACKER_PROGRAM_ID)
        )
      const dataOnChain = await smpClient.account.productAccountState.fetch(pda)
      // alert(dataOnChain.serialNum)
      console.log(dataOnChain)
      setItemDetailSolana({
        manufacturerKey,
        serialNum: dataOnChain.serialNum,
        rePlasticPct: dataOnChain.rePlasticPct,
        purchaserKey: dataOnChain.purchaserKey
      })
    }catch(error){
      console.log(error)
      setItemDetailSolana({...itemDetailSolana, manufacturerKey})
    }
  }

  useEffect(()=>{
    fetch(("https://j5so6wp9z0.execute-api.us-east-1.amazonaws.com/api/product/getone/"+productId))
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data)
      setItemDetail(data)
      getDataFromSolana(data.manufacturer.solanaPubKey, data.product.serialNum)
    })
  },[])

  const webWeb3DataMatch = {
    serialNum: (itemDetail.product.serialNum == itemDetailSolana.serialNum),
    rePlasticPct: (itemDetail.product.rePlasticPct == itemDetailSolana.rePlasticPct),
    manufacturerKey: (itemDetail.manufacturer.solanaPubKey == itemDetailSolana.manufacturerKey),
    purchaserKey: (itemDetail.purchaser.solanaPubKey == itemDetailSolana.purchaserKey)
  }
  console.log(webWeb3DataMatch)
  return (
    <>
    <Row className="text-center mt-3 m-1">
      <Col lg={4} md={3} sm={1}></Col>
      <Col>
        <Row className="border">
          <h3>Product Details</h3>
          <Form className="text-center mt-1">
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Product ID</Form.Label>
            <Form.Control style={{width:"290px"}} disabled placeholder={itemDetail.product._id}></Form.Control>
          </div><div className="d-flex m-1 align-items-center">
            <Form.Label style={{width:"100px"}}>Serial #</Form.Label>
            <Form.Control style={{width:"250px" , color:"red"}} className="me-3" disabled placeholder={itemDetail.product.serialNum}></Form.Control>
            {(webWeb3DataMatch.serialNum) ? 
            <div className="bg-success border p-1"><FontAwesomeIcon icon={faSquareCheck}/></div> : 
            <div className="bg-danger border p-1"><FontAwesomeIcon icon={faSquareXmark}/></div>}
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Name</Form.Label>
            <Form.Control style={{width:"290px", color:"red"}} disabled placeholder={itemDetail.product.name}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Description</Form.Label>
            <Form.Control style={{width:"290px"}}disabled placeholder={itemDetail.product.description}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Buyer's Key</Form.Label>
            <Form.Control className="me-3" style={{width:"250px"}} disabled placeholder={itemDetail.purchaser.solanaPubKey}></Form.Control>
            {(webWeb3DataMatch.purchaserKey) ? 
            <div className="bg-success border p-1"><FontAwesomeIcon icon={faSquareCheck}/></div> : 
            <div className="bg-danger border p-1"><FontAwesomeIcon icon={faSquareXmark}/></div>}
          </div>
          
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Re-Plastic %</Form.Label>
            <Form.Control className="me-3" style={{width:"250px"}} disabled placeholder={itemDetail.product.rePlasticPct}></Form.Control>
            {(webWeb3DataMatch.rePlasticPct) ? 
            <div className="bg-success border p-1"><FontAwesomeIcon icon={faSquareCheck}/></div> : 
            <div className="bg-danger border p-1"><FontAwesomeIcon icon={faSquareXmark}/></div>}
          </div>
          <div className="d-flex m-1 mb-4">
            <Form.Label style={{width:"100px"}} className="">Date of Sale</Form.Label>
            <Form.Control style={{width:"290px"}} disabled placeholder={itemDetail.product.saleDate+"-"+itemDetail.product.saleMonth+"-"+itemDetail.product.saleYear}></Form.Control>
          </div>
          </Form>
        
        </Row>

        <Row className="border mt-2 mb-2">
          <h3>Manufacturer Details</h3>
          <Form className="text-center mt-2">
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Public Key</Form.Label>
            <Form.Control className="me-3" style={{width:"250px"}} disabled placeholder={itemDetail.manufacturer.solanaPubKey}></Form.Control>
            {(webWeb3DataMatch.manufacturerKey) ? 
            <div className="bg-success border p-1"><FontAwesomeIcon icon={faSquareCheck}/></div> : 
            <div className="bg-danger border p-1"><FontAwesomeIcon icon={faSquareXmark}/></div>}
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Name</Form.Label>
            <Form.Control style={{width:"290px"}} disabled  placeholder={itemDetail.manufacturer.name}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Country</Form.Label>
            <Form.Control style={{width:"290px"}} disabled placeholder={itemDetail.manufacturer.regCountry}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Registration #</Form.Label>
            <Form.Control style={{width:"290px"}} disabled placeholder={itemDetail.manufacturer.regNum}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Email</Form.Label>
            <Form.Control style={{width:"290px"}} disabled placeholder={itemDetail.manufacturer.email}></Form.Control>
          </div>
          <div className="d-flex m-1">
            <Form.Label style={{width:"100px"}}>Phone #</Form.Label>
            <Form.Control style={{width:"290px"}} disabled placeholder={itemDetail.manufacturer.phoneNum}></Form.Control>
          </div>
          
        </Form>
        </Row>

      </Col>
      <Col lg={4} sm={1} md={3} className="m-1">
      <div className="d-flex justify-content-start align-items-start">
        <div className="bg-success p-1">
          <FontAwesomeIcon icon={faSquareCheck}/>
        </div>
        <p>.   Verified (Solana)</p>
      </div>
      <div className="d-flex justify-content-start align-items-start">
        <div className="bg-danger p-1">
          <FontAwesomeIcon icon={faSquareXmark}/>
        </div>
        <p>.  UnVerified</p>
      </div>
      </Col>
    </Row>
    </>
  )
}

export default ItemDetail