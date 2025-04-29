import ReactECharts from "echarts-for-react";
import callApi from "../../../apis/GatewayApi.js";
import {useEffect, useState} from "react";

const ChartCash = (props) => {
    const [dates, setDates] = useState([])
    const [incomes, setIncomes] = useState([])
    const [outcomes, setOutcomes] = useState([])
    const [loans, setLoans] = useState([])
    const [balances, setBalances] = useState([])

    useEffect(() => {
        callApi('pkg_bud_wallet.get_summary', {}, (data) => {
            const oDate = data.map(e => e.C_DATE)
            const oIncomes = data.map(e => e.C_UP_VALUE)
            const oOutcomes = data.map(e => e.C_DOWN_VALUE)
            const oLoan = data.map(e => e.C_LOAN_VALUE)
            const oBalances = data.map(e => e.C_BALANCE_VALUE)

            setDates(oDate)
            setIncomes(oIncomes)
            setOutcomes(oOutcomes)
            setLoans(oLoan)
            setBalances(oBalances)
        })
    }, [])

    const option = {
        title: {
            text: 'Income and Outcome'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Income', 'Outcome', 'Loan', 'Balance']
        },
        toolbox: {
            show: true,
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: dates
            }
        ],
        yAxis: [
            {
                name: 'Loan value (đ)',
                type: 'value'
            },
            {
                name: 'Balance value (1.000đ)',
                type: 'value',
                alignTicks: true,
            }
        ],
        series: [
            {
                name: 'Outcome',
                type: 'bar',
                color: '#e69a9a',
                data: outcomes,
            },
            {
                name: 'Income',
                type: 'bar',
                color: '#97e39b',
                data: incomes,
            },
            {
                name: 'Loan',
                type: 'line',
                color: '#E69703',
                data: loans,
            },
            {
                name: 'Balance',
                type: 'line',
                yAxisIndex: 1,
                color: '#1bc610',
                data: balances,
            }
        ]
    };

    return (
        <ReactECharts
            style={{ width: '100%', height: '100%' }}
            option={option}
        />
    )
}

export default ChartCash;