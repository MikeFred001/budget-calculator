import axios from "axios";

const BACKEND_PORT = 8080;
const BASE_URL = `http://localhost:${BACKEND_PORT}/api`;

interface IBudgetItem {
  name: string;
  cost: string;
  freq: string;
  startDate: string;
}

interface IDebtItem {
  name: string;
  amount: string;
}

class GirlMathAPI {
  //--BUDGET-ITEMS------------------------------------------------------------//

  static async getAllBudgetItems() {
    const res = await axios.get(`${BASE_URL}/budget-items`);
    return res.data;
  }

  static async addBudgetItem(item: IBudgetItem) {
    const res = await axios.post(`${BASE_URL}/budget-items`, item);
    return res.data;
  }

  static async deleteBudgetItem(id: number) {
    await axios.delete(`${BASE_URL}/budget-items/${id}`);
  }

  //--DEBT-ITEMS----------------------------------------------------------------//

  static async getAllDebtItems() {
    const res = await axios.get(`${BASE_URL}/debt-items`);
    return res.data;
  }

  static async addDebtItem(item: IDebtItem) {
    const res = await axios.post(`${BASE_URL}/debt-items`, item);
    return res.data;
  }

  static async updateDebtItem(id: number, item: IDebtItem) {
    const res = await axios.put(`${BASE_URL}/debt-items/${id}`, item);
    return res.data;
  }

  static async deleteDebtItem(id: number) {
    await axios.delete(`${BASE_URL}/debt-items/${id}`);
  }

  //--MONTHLY-INCOME------------------------------------------------------------//

  static async getAppSettings() {
    const res = await axios.get(`${BASE_URL}/app-settings`);
    return res.data;
  }

  static async updateMonthlyIncome(income: number) {
    const res = await axios.put(`${BASE_URL}/app-settings`, {
      monthly_income: income,
    });
    return res.data;
  }
}

export default GirlMathAPI;
