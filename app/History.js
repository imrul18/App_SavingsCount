import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Axios from 'axios';
const History = () => {

    const [withdrawHistory, setWithdrawHistory] = useState()
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const totalWithdraw = () => {
        var carry = 0
        Axios.get('https://raw.githubusercontent.com/imrul18/CountTK/main/WithdrawHistory')
            .then((res) => {
                setWithdrawHistory(res.data)
                res.data.forEach(item => {
                    carry += item.amount;
                })
                setWithdrawAmount(carry)
            })
    }
    useEffect(() => {
        totalWithdraw()
    }, [])
    
    const showHistory = (item) => {
        return (
            <View style={styles.history}>
                <Text style={styles.historydate}>{item.item.date}</Text>
                <Text style={styles.historyamount}>{item.item.amount}</Text>
                <Text style={styles.historycomment}>{item.item.comment}</Text>
            </View>
        )
    }

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headertext}>Withdraw History</Text>
                </View>
                <View style={styles.historyheader}>
                    <Text style={styles.historyheaderdate}>Date</Text>
                    <Text style={styles.historyheaderamount}>Amount</Text>
                    <Text style={styles.historyheadercomment}>Comment</Text>
                </View>
                <FlatList
                    howsVerticalScrollIndicator={false}
                    data={withdrawHistory}
                    renderItem={showHistory}
                    keyExtractor={item => item.amount}
                />
                <View style={styles.historyheader}>
                    <Text style={styles.historyheaderdate}>Total</Text>
                    <Text style={styles.historyheaderamount}>{withdrawAmount}</Text>
                    <Text style={styles.historyheadercomment}></Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#46A0C2"
    },
    container: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10
    },
    header: {
        alignItems: 'center',
        margin: 10
    },
    headertext: {
        fontSize: 20,
        fontWeight: "800"
    },
    historyheader: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    historyheaderdate: {
        flex: 2,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700'
    },
    historyheaderamount: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700'
    },
    historyheadercomment: {
        flex: 3,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700'
    },
    history: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    historydate: {
        flex: 2,
        textAlign: 'center',
    },
    historyamount: {
        flex: 1,
        textAlign: 'center',
    },
    historycomment: {
        flex: 3,
        textAlign: 'center',
    },
});

export default History