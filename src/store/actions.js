import Api from "@/api/index"
const actions = {
  async getUser(context) {
    let info = await Api.getUser()
    context.commit("SET_NICKNAME", info);
  }
}
export default actions
