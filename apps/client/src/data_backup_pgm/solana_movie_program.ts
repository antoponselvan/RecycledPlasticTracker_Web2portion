export type SolanaMovieProgram = {
    "version": "0.1.0",
    "name": "solana_movie_program",
    "instructions": [
      {
        "name": "addOrUpdateReview",
        "accounts": [
          {
            "name": "initializer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "pdaAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "variant",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "rating",
            "type": "u8"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "movieAccountState",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "isInitialized",
              "type": "bool"
            },
            {
              "name": "rating",
              "type": "u8"
            },
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "MovieInstruction",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "AddMovieReview",
              "fields": [
                {
                  "name": "title",
                  "type": "string"
                },
                {
                  "name": "rating",
                  "type": "u8"
                },
                {
                  "name": "description",
                  "type": "string"
                }
              ]
            },
            {
              "name": "UpdateMovieReview",
              "fields": [
                {
                  "name": "title",
                  "type": "string"
                },
                {
                  "name": "rating",
                  "type": "u8"
                },
                {
                  "name": "description",
                  "type": "string"
                }
              ]
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "UninitializedAccount",
        "msg": "Account not initialized yet"
      },
      {
        "code": 6001,
        "name": "InvalidPDA",
        "msg": "PDA derived does not equal PDA passed in"
      },
      {
        "code": 6002,
        "name": "InvalidDataLength",
        "msg": "Input data exceeds max length"
      },
      {
        "code": 6003,
        "name": "InvalidRating",
        "msg": "Rating greater than 5 or less than 1"
      }
    ]
  };
  
  export const IDL: SolanaMovieProgram = {
    "version": "0.1.0",
    "name": "solana_movie_program",
    "instructions": [
      {
        "name": "addOrUpdateReview",
        "accounts": [
          {
            "name": "initializer",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "pdaAccount",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "variant",
            "type": "u8"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "rating",
            "type": "u8"
          },
          {
            "name": "description",
            "type": "string"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "movieAccountState",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "isInitialized",
              "type": "bool"
            },
            {
              "name": "rating",
              "type": "u8"
            },
            {
              "name": "title",
              "type": "string"
            },
            {
              "name": "description",
              "type": "string"
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "MovieInstruction",
        "type": {
          "kind": "enum",
          "variants": [
            {
              "name": "AddMovieReview",
              "fields": [
                {
                  "name": "title",
                  "type": "string"
                },
                {
                  "name": "rating",
                  "type": "u8"
                },
                {
                  "name": "description",
                  "type": "string"
                }
              ]
            },
            {
              "name": "UpdateMovieReview",
              "fields": [
                {
                  "name": "title",
                  "type": "string"
                },
                {
                  "name": "rating",
                  "type": "u8"
                },
                {
                  "name": "description",
                  "type": "string"
                }
              ]
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "UninitializedAccount",
        "msg": "Account not initialized yet"
      },
      {
        "code": 6001,
        "name": "InvalidPDA",
        "msg": "PDA derived does not equal PDA passed in"
      },
      {
        "code": 6002,
        "name": "InvalidDataLength",
        "msg": "Input data exceeds max length"
      },
      {
        "code": 6003,
        "name": "InvalidRating",
        "msg": "Rating greater than 5 or less than 1"
      }
    ]
  };
  