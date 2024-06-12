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
    | null
