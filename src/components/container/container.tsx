import React from 'react';
import style from './container.module.css';

type ContainerProps = {
	children: React.ReactNode;
	className?: string;
};

export const Container = ({
	children,
	className,
}: ContainerProps): React.JSX.Element => {
	return (
		<div
			className={`${style.container} pl-4 pr-4 ${className ? className : ''}`}>
			{children}
		</div>
	);
};
