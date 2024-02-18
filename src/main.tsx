import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { routeTree } from './routeTree.gen'

import { injected } from 'wagmi/connectors'
import { MetaMask, WagmiWeb3ConfigProvider } from '@ant-design/web3-wagmi'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { goerli } from 'wagmi/chains'
// Create a new router instance
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
const router = createRouter({ routeTree })
const config = createConfig({
    //@ts-ignore
    chains: [goerli],
    transports: {
        [goerli.id]: http(),
    },
    connectors: [
        injected({
            target: 'metaMask',
        }),
    ],
})
// Register the router instance for type safety

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <WagmiWeb3ConfigProvider
                config={config}
                eip6963={{
                    autoAddInjectedWallets: true,
                }}
                wallets={[MetaMask()]}
            >
                <RouterProvider router={router} />
            </WagmiWeb3ConfigProvider>
        </StrictMode>
    )
}
