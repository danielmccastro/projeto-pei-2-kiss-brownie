import { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";

export const AppContext = createContext();

function AppProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [task, setTask] = useState([]);
    const [priorityTask, setPriorityTask] = useState(null);
    const [revenue, setRevenue] = useState([]);
    const [expense, setExpense] = useState([]);


    useEffect(() => {
        async function loadFonts() {
            setLoading(true);
            await Font.loadAsync({
                InterLight: require('../assets/fonts/Inter_300Light.ttf'),
                InterRegular: require('../assets/fonts/Inter_400Regular.ttf'),
                InterSemiBold: require('../assets/fonts/Inter_600SemiBold.ttf'),
                InterBold: require('../assets/fonts/Inter_700Bold.ttf'),
            });
            setLoading(false);
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    useEffect(() => {
        async function loadStorage() {
            setLoading(true);
            try {
                const storageTask = await AsyncStorage.getItem('@storageTask');
                setTask(storageTask ? JSON.parse(storageTask) : []);

                const storageRevenue = await AsyncStorage.getItem('@storageRevenue');
                setRevenue(storageRevenue ? JSON.parse(storageRevenue) : []);

                const storageExpense = await AsyncStorage.getItem('@storageExpense');
                setExpense(storageExpense ? JSON.parse(storageExpense) : []);

            } catch (err) {
                console.error("Error ao carregar o armazenamento:", err);
            } finally {
                setLoading(false);
            }
        }
        loadStorage()
    }, []);

    async function addTask(taskDescription, priority = false) {
        try {
            if (!taskDescription) {
                Alert.alert('Descrição da tarefa deve ser preenchida.');
                return;
            }

            const existingTaskIndex = task.findIndex(t => t.description === taskDescription);

            if (existingTaskIndex !== -1) {
                const updatedTasks = [...task];
                updatedTasks[existingTaskIndex].priority = priority;
                await AsyncStorage.setItem('@storageTask', JSON.stringify(updatedTasks));
                setTask(updatedTasks);
                Alert.alert('Prioridade alterada com sucesso!');
            } else {
                const newTask = {
                    description: taskDescription,
                    priority: priority,
                };

                const updatedTasks = [...task, newTask];
                await AsyncStorage.setItem('@storageTask', JSON.stringify(updatedTasks));
                setTask(updatedTasks);
                Alert.alert('Nova tarefa adicionada com sucesso!');
            }
        } catch (error) {
            console.error('Error ao adicionar tarefa:', error);
        }
    };

    async function deleteTask(index) {
        try {
            const updatedTasks = task.filter((_, i) => i !== index);
            await AsyncStorage.setItem('@storageTask', JSON.stringify(updatedTasks));
            setTask(updatedTasks);
            Alert.alert('Tarefa deletada com sucesso!');
        } catch (error) {
            console.error('Error ao deletar tarefa:', error);
        }
    };

    async function markAsPriority(index) {
        try {

            const updatedTasks = [...task];

            updatedTasks.forEach((task, i) => {
                if (i !== index) {
                    task.priority = false;
                }
            });

            updatedTasks[index].priority = true;

            setTask(updatedTasks);
            await AsyncStorage.setItem('@storageTask', JSON.stringify(updatedTasks));
            Alert.alert(`Tarefa "${updatedTasks[index].description}" marcada como prioritária!`);
        } catch (error) {
            console.error('Error ao marcar como prioridade:', error);
        }
    };

    async function getPriorityTask() {
        try {
            const storageTasks = await AsyncStorage.getItem('@storageTask');
            const parsedTasks = storageTasks ? JSON.parse(storageTasks) : [];
            const priorityTask = parsedTasks.find(t => t.priority);
            setPriorityTask(priorityTask);
            return priorityTask || null;
        } catch (error) {
            console.error('Error ao obter a tarefa priorária:', error);
            return null;
        }
    };

    async function addRevenue(amount, description) {
        try {
            if (!amount || !description) {
                Alert.alert('Receita e descrição devem ser preenchidos.');
                return;
            }

            const cleanedAmount = amount.trim().replace(',', '.');

            const parsedAmount = parseFloat(cleanedAmount);

            if (isNaN(parsedAmount)) {
                Alert.alert('Quantidade deve ser um número.');
                return;
            }

            const amountRounded = parsedAmount.toFixed(2);

            const newRevenue = {
                amount: amountRounded,
                description
            };

            const updatedRevenues = [...revenue, newRevenue];
            await AsyncStorage.setItem('@storageRevenue', JSON.stringify(updatedRevenues));
            setRevenue(updatedRevenues);
            console.log('Receita adicionada com sucesso!');
        } catch (error) {
            console.error('Error ao adicionar receita:', error);
        }
    }


    async function deleteRevenue(index) {
        try {
            const updatedRevenues = revenue.filter((_, i) => i !== index);
            await AsyncStorage.setItem('@storageRevenue', JSON.stringify(updatedRevenues));
            setRevenue(updatedRevenues);
            console.log('Receita deletada com sucesso!');
        } catch (error) {
            console.error('Error ao deletar receita:', error);
        }
    };

    async function addExpense(amount, description) {
        try {
            if (!amount || !description) {
                Alert.alert('Receita e descrição devem ser preenchidos.');
                return;
            }

            const cleanedAmount = amount.trim().replace(',', '.');
            const parsedAmount = parseFloat(cleanedAmount);

            if (isNaN(parsedAmount)) {
                Alert.alert('Quantidade deve ser um número.');
                return;
            }

            const amountFloat = parsedAmount.toFixed(2);

            const newExpense = { amount: amountFloat, description };
            const updatedExpenses = [...expense, newExpense];
            await AsyncStorage.setItem('@storageExpense', JSON.stringify(updatedExpenses));
            setExpense(updatedExpenses);
            console.log('Despesa adicionada com sucesso!');
        } catch (error) {
            console.error('Error ao adicionar despesa:', error);
        }
    }


    async function deleteExpense(index) {
        try {
            const updatedExpenses = expense.filter((_, i) => i !== index);
            await AsyncStorage.setItem('@storageExpense', JSON.stringify(updatedExpenses));
            setExpense(updatedExpenses);
            console.log('Despesa deletada com sucesso!');
        } catch (error) {
            console.error('Error ao deletar despesa:', error);
        }
    };

    function sumAmount(register) {
        let sum = 0;
        sum = register.reduce((acc, curr) => acc + Number(curr.amount), 0);
        return sum;
    }

    return (
        <AppContext.Provider value={{
            loading,
            fontsLoaded,
            task,
            setTask,
            addTask,
            deleteTask,
            markAsPriority,
            priorityTask,
            getPriorityTask,
            revenue,
            setRevenue,
            expense,
            setExpense,
            addRevenue,
            deleteRevenue,
            addExpense,
            deleteExpense,
            sumAmount,
            isAuthenticated,
            setIsAuthenticated,
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;