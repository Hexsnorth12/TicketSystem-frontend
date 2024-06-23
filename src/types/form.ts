export type State =
    | {
          status: 'success'
          message: string
      }
    | {
          status: 'error'
          message: string
          errors?: Array<{
              path: string
              message: string
          }>
      }
    | {
          // 成功回傳api但申請失敗
          status: '6516'
          message: string
          data: object
      }
    | null
