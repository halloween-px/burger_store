import { formatNumber } from '@/utils/utils';
import styles from './feed-order.module.css';

type TProps = {
	doneNumbers: Record<number, Array<number>>;
	pendingNumbers: Record<number, Array<number>>;
	total: number;
	totalToday: number;
};

export const FeedOrderInfo = ({ doneNumbers, pendingNumbers, total, totalToday }: TProps) => {
	return (
		<div className={styles.info}>
			<div className={styles.status_area}>
				<div className={styles.done}>
					<h5 className='text text_type_main-default'>Готовы:</h5>
					<div className={styles.status_wrapper}>
						{Object.values(doneNumbers).map((numbers, index) => (
							<ul className={styles.list_numbers} key={index}>
								{numbers.map((number) => (
									<li className='text text_type_digits-default' key={number}>
										0{number}
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
				<div className={styles.pending}>
					<h5 className='text text_type_main-default'>В работе:</h5>
					<div className={styles.status_wrapper}>
						{Object.values(pendingNumbers).map((numbers, index) => (
							<ul className={styles.list_numbers} key={index}>
								{numbers.map((number) => (
									<li className='text text_type_digits-default' key={number}>
										0{number}
									</li>
								))}
							</ul>
						))}
					</div>
				</div>
			</div>
			<div>
				<h5 className='text text_type_main-default'>Выполнено за все время:</h5>
				<h2 className={`text text_type_digits-large ${styles.digits}`}>{formatNumber(total)}</h2>
			</div>
			<div>
				<h5 className='text text_type_main-default'>Выполнено за сегодня:</h5>
				<h2 className={`text text_type_digits-large ${styles.digits}`}>{totalToday}</h2>
			</div>
		</div>
	);
};
