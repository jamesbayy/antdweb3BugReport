import { ConnectButton, Connector } from '@ant-design/web3'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
    component: Index,
})

function Index() {
    return (
        <div className="p-2">
            <h3>Welcome Home!</h3>
            <Connector>
                <ConnectButton />
            </Connector>
        </div>
    )
}
