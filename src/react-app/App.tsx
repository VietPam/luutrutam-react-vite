import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import cloudflareLogo from "./assets/Cloudflare_Logo.svg"
import honoLogo from "./assets/hono.svg"
import { Container, Typography, Box, Stack, Card, CardContent, Button } from "@mui/material"

function App() {
	const [count, setCount] = useState(0)
	const [name, setName] = useState("unknown")

	const getName = async () => {
		const res = await fetch("/api/")
		const data = (await res.json()) as { name: string }
		setName(data.name)
	}

	return (
		<Container maxWidth="md" sx={{ mt: 6 }}>
			<Stack spacing={4} alignItems="center">
				<Box sx={{ display: "flex", gap: 4 }}>
					<a href="https://vite.dev" target="_blank">
						<img src={viteLogo} height={64} />
					</a>
					<a href="https://react.dev" target="_blank">
						<img src={reactLogo} height={64} />
					</a>
					<a href="https://hono.dev/" target="_blank">
						<img src={honoLogo} height={64} />
					</a>
					<a href="https://workers.cloudflare.com/" target="_blank">
						<img src={cloudflareLogo} height={64} />
					</a>
				</Box>

				<Typography variant="h3">
					Vite + React + Hono + Cloudflare
				</Typography>

				<Card sx={{ width: "100%" }}>
					<CardContent>
						<Stack spacing={2} alignItems="center">
							<Button
								variant="contained"
								onClick={() => setCount((c) => c + 1)}
							>
								count is {count}
							</Button>

							<Typography>
								Edit <code>src/App.tsx</code> and save to test HMR
							</Typography>
						</Stack>
					</CardContent>
				</Card>

				<Card sx={{ width: "100%" }}>
					<CardContent>
						<Stack spacing={2} alignItems="center">
							<Button
								variant="contained"
								onClick={getName}
							>
								Name from API is: {name}
							</Button>

							<Typography>
								Edit <code>worker/index.ts</code> to change the name
							</Typography>
						</Stack>
					</CardContent>
				</Card>

				<Typography color="text.secondary">
					Click on the logos to learn more
				</Typography>
			</Stack>
		</Container>
	)
}

export default App