import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import Axios from 'axios';

const Home = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const setTime = () => {
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        if (sec.toString().length == 1) sec = "0" + sec;
        if (min.toString().length == 1) min = "0" + min;
        if (hours.toString().length == 1) hours = "0" + hours;
        if (year.toString().length == 1) year = "0" + year;
        if (month.toString().length == 1) month = "0" + month;
        if (date.toString().length == 1) date = "0" + date;
        setCurrentDate(date + '-' + month + '-' + year)
        setCurrentTime(hours + ':' + min + ':' + sec);
    }
    setInterval(setTime, 1000);

    const [totalAmount, setTotalAmount] = useState()
    const calculatedAmount = () => {
        const date1 = new Date('06/24/2021');
        const date2 = new Date();
        setTotalAmount(Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24)) * 10)
    }

    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const totalWithdraw = () => {
        var carry = 0
        Axios.get('https://raw.githubusercontent.com/imrul18/CountTK/main/WithdrawHistory')
            .then((res) => {
                res.data.forEach(item => {
                    carry += item.amount;
                })
                setWithdrawAmount(carry)
            })
    }

    const [currentAmount, setCurrentAmount] = useState(0)
    const calculateCurrentAmount = () => {
        setCurrentAmount((totalAmount - withdrawAmount).toString(10))
    }

    useEffect(() => {
        totalWithdraw()
        calculatedAmount()
    }, [])

    useEffect(() => {
        calculateCurrentAmount()
    }, [totalAmount, withdrawAmount])

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.time}>
                    {currentTime}
                </Text>
                <Text style={styles.date}>
                    {currentDate}
                </Text>
                <Text style={styles.totalamount}>
                    Total Savings: {totalAmount}
                </Text>
                <Text style={styles.totalamount}>
                    Total Withdraws: {withdrawAmount}
                </Text>
                <Text style={styles.totalamount}>
                    Current Savings: {currentAmount}
                </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#46A0C2"
    },
    container: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        marginHorizontal: 40,
        borderRadius: 10
    },
    time: {
        alignSelf: 'center',
        fontSize: 32,
        fontWeight: "700",
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5

    },
    date: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: "600",
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5
    },
    totalamount: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: "700",
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5
    }
});

export default Home