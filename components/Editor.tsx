'use client'

import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'

export default function Editor() {
	return (
		<div style={{position: "fixed", inset: 0}}>
			<Tldraw/>
		</div>
	)
}