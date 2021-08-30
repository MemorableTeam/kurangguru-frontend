import axios from "axios";

const globalGet = (args) => axios({ ...args, method: 'GET' }).then(res => { return res.data.data }).catch(err => { return err.response }),
  globalPost = (args) => axios({ ...args, method: 'POST' }).then(res => { return res.data }).catch(err => { return err.response }),
  globalPatch = (args) => axios({ ...args, method: 'PATCH' }).then(res => { return res.data }).catch(err => { return err.response }),
  globalDelete = (args) => axios({ ...args, method: 'DELETE' }).then(res => { return res.data }).catch(err => { return err.response })

export { globalGet, globalPost, globalPatch, globalDelete }