interface Consumer {
  (method: string, callback: (response: any) => Promise<void>): Promise<void>
}

export default Consumer;