'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { CARD_SPACING } from '@/consts'
import shareList from '@/app/share/list.json'
import Link from 'next/link'
import { HomeDraggableLayer } from './home-draggable-layer'

type ShareItem = {
	name: string
	url: string
	logo: string
	description: string
	tags: string[]
	stars: number
}

export default function ShareCard() {
	const center = useCenterStore()
	const { cardStyles, siteContent } = useConfigStore()
	const [randomItems, setRandomItems] = useState<ShareItem[]>([])
	const styles = cardStyles.shareCard
	const hiCardStyles = cardStyles.hiCard
	const socialButtonsStyles = cardStyles.socialButtons

	useEffect(() => {
		// 随机抽取4个不重复的网站
		const shuffled = [...shareList].sort(() => 0.5 - Math.random())
		setRandomItems(shuffled.slice(0, 4))
	}, [])

	if (randomItems.length === 0) {
		return null
	}

	const x = styles.offsetX !== null ? center.x + styles.offsetX : center.x + hiCardStyles.width / 2 - socialButtonsStyles.width
	const y = styles.offsetY !== null ? center.y + styles.offsetY : center.y + hiCardStyles.height / 2 + CARD_SPACING + socialButtonsStyles.height + CARD_SPACING

	return (
		<HomeDraggableLayer cardKey='shareCard' x={x} y={y} width={styles.width} height={styles.height}>
			<Card order={styles.order} width={styles.width} height={styles.height} x={x} y={y}>
				{siteContent.enableChristmas && (
					<>
						<img
							src='/images/christmas/snow-12.webp'
							alt='Christmas decoration'
							className='pointer-events-none absolute'
							style={{ width: 120, left: -12, top: -12, opacity: 0.8 }}
						/>
					</>
				)}

				<h2 className='text-secondary text-sm'>随机推荐</h2>

				<div className="mt-2 space-y-3">
					{randomItems.map((item, index) => (
						<Link key={index} href={item.url} target="_blank" className="block space-y-2">
							<div className='flex items-center'>
								<div className='relative mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-xl'>
									<img src={item.logo} alt={item.name} className='h-full w-full object-contain' />
								</div>
								<div className="flex-1 min-w-0">
									<h3 className='text-sm font-medium truncate'>{item.name}</h3>
									<p className='text-secondary line-clamp-2 text-xs'>{item.description}</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</Card>
		</HomeDraggableLayer>
	)
}
