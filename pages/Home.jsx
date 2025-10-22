import { useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView } from "react-native";
import { AppContext } from "../contexts/AppContext";
import { setCurrencyFormat } from "../services/currency.js";
import FinancialBalanceCard from "../components/FinancialBalanceCard.jsx";
import FinancialPostingCard from "../components/FinancialPostingCard.jsx";
import PriorityTaskCard from "../components/PriorityTaskCard.jsx";

export default function Home() {
  const {
    task,
    priorityTask,
    setPriorityTask,
    getPriorityTask,
    revenue,
    expense,
    sumAmount,
  } = useContext(AppContext);

  const totalExpense = sumAmount(expense);
  const totalRevenue = sumAmount(revenue);
  const balance = totalRevenue - totalExpense;

  useEffect(() => {
    const fetchPriorityTask = async () => {
      const task = await getPriorityTask();
      setPriorityTask(task);
    };
    fetchPriorityTask();
  }, [task]);

  return (
    <ScrollView style={styles.container}>
      <FinancialBalanceCard value={setCurrencyFormat(balance)} title="Balanço" />
      <PriorityTaskCard priorityTask={priorityTask} />
      <FinancialPostingCard
        title="Receitas"
        totalAmount={setCurrencyFormat(totalRevenue)}
        value={revenue}
      />
      <FinancialPostingCard
        title="Despesas"
        totalAmount={setCurrencyFormat(totalExpense)}
        value={expense}
      />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});