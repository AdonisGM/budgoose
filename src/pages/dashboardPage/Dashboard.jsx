import {Card, CardBody} from "@nextui-org/react";
import ChartCash from "./ChartCash.jsx";

const Dashboard = (props) => {
    return (
        <div className={'grid grid-cols-4 gap-4'}>
            <div>
                <Card
                    shadow={'sm'}
                    isPressable={true}
                    className={'w-full h-full'}
                >
                    <CardBody>

                    </CardBody>
                </Card>
            </div>
            <div className={'col-span-3'}>
                <Card
                    shadow={'sm'}
                    isPressable={false}
                    className={'w-full'}
                >
                    <CardBody>
                        <ChartCash/>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard