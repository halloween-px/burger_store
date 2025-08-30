import styles from './preloader.module.css';

type TProps = {
	isFull?: boolean;
};

export const Preloader = ({ isFull }: TProps) => (
	<div className={`${styles.preloader} ${isFull ? styles.full : ''}`}>
		<div className={styles.preloader_circle} />
	</div>
);
