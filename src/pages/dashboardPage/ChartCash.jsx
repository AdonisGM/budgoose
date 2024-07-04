import * as echarts from "echarts/core";
import ReactECharts from "echarts-for-react";
import {GridComponent, TitleComponent, TooltipComponent} from "echarts/components";
import {BarChart} from "echarts/charts";
import {CanvasRenderer} from "echarts/renderers";

const ChartCash = (props) => {
    const options = {
        title: {
            text: 'Rainfall vs Evaporation'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Cash balance', 'Loan']
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
                data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Cash balance',
                type: 'bar',
                data: [
                    2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                ],
            },
            {
                name: 'Loan',
                type: 'bar',
                data: [
                    2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
                ],
            }
        ]
    };

    return (
        <ReactECharts
            option={options}
        />
    )
}

export default ChartCash;