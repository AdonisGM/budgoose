import {Card, CardBody} from "@nextui-org/react";
import ChartCash from "./items/ChartCash.jsx";
import TotalCash from "./items/TotalCash.jsx";

const Dashboard = (props) => {
    return (
        <div className={'grid grid-cols-4 grid-rows-4 gap-4'}>
            <div>
                <Card
                    shadow={'sm'}
                    isPressable={true}
                    className={'h-full w-full'}
                >
                    <CardBody>
                        <TotalCash/>
                    </CardBody>
                </Card>
            </div>
            <div className={'col-span-3 row-span-4'}>
                <Card
                    shadow={'sm'}
                    isPressable={false}
                    className={'w-full h-full'}
                >
                    <CardBody>
                        <ChartCash/>
                    </CardBody>
                </Card>
            </div>
            <div className={'row-span-2'}>
                <Card
                    shadow={'sm'}
                    isPressable={true}
                    className={'w-full h-full'}
                >
                    <CardBody>

                    </CardBody>
                </Card>
            </div>
            <div className={'row-span-2'}>
                <Card
                    shadow={'sm'}
                    isPressable={true}
                    className={'w-full h-full'}
                >
                    <CardBody>

                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard