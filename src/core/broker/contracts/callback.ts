interface Callback {
  (message: any): Promise<void>
}

export default Callback;