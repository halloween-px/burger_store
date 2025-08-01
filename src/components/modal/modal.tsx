import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export type PorpsModal = {
	children?: React.ReactNode;
	onClose: () => void;
	portalContainer?: Element | DocumentFragment;
	title?: string;
};

type PropsModalOverlay = {
	onClose: () => void;
};

const ModalOverlay = ({ onClose }: PropsModalOverlay): React.JSX.Element => {
	return (
		<div
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === 'Escape' || e.key === ' ') {
					e.preventDefault();
					onClose();
				}
			}}
			role='button'
			tabIndex={0}
			className={styles.modal_overlay}
		/>
	);
};

export const Modal = ({
	children,
	title,
	onClose,
	portalContainer = document.body,
}: PorpsModal) => {
	useEffect(() => {
		const handleESC = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleESC);

		return () => document.removeEventListener('keydown', handleESC);
	}, [onClose]);

	return createPortal(
		<div className={styles.modal} role='dialog' aria-modal='true'>
			<div className={styles.modal_dialog}>
				<header className={styles.modal_header}>
					{title && <h2 className='text text_type_main-large'>{title}</h2>}
					<CloseIcon className={styles.modal_close} onClick={onClose} type='primary' />
				</header>
				<div className={styles.modal_content}>{children}</div>
			</div>
			<ModalOverlay onClose={onClose} />
		</div>,
		portalContainer
	);
};
