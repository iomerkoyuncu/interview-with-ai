import React, { useState, useEffect } from 'react';

interface CountdownProps {
	duration: number; // Süre (saniye)
	onComplete?: () => void; // Tamamlandığında çalışacak fonksiyon
	resetKey?: number; // Geri sayımı sıfırlamak için bir key
}

const Countdown: React.FC<CountdownProps> = ({
	duration,
	onComplete,
	resetKey,
}) => {
	const [timeLeft, setTimeLeft] = useState(duration);
	const [completed, setCompleted] = useState(false); // onComplete kontrolü

	useEffect(() => {
		setTimeLeft(duration); // Reset key değiştiğinde süreyi yeniden başlat
		setCompleted(false); // onComplete durumunu sıfırla
	}, [resetKey, duration]);

	useEffect(() => {
		if (timeLeft <= 0 && !completed) {
			setCompleted(true); // onComplete sadece bir kez tetiklenir
			if (onComplete) {
				onComplete();
			}
			return;
		}

		const interval = setInterval(() => {
			setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => clearInterval(interval);
	}, [timeLeft, completed, onComplete]);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	return (
		<div
			className={`font-bold text-center text-lg ${
				minutes === 0 && seconds < 20 ? 'text-red-500' : 'text-black'
			}`}
		>
			{minutes > 0 && `${minutes}:`}
			{seconds < 10 ? `0${seconds}` : seconds}
		</div>
	);
};

export default Countdown;
