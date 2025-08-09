import styles from './form.module.css';
import { Children, isValidElement } from 'react';
import { TChildren, TLinkGroup, TPropsBaseForm } from './types';
import { Link } from 'react-router-dom';

const BaseForm = ({
	title,
	children,
	position = 'center',
	...otherProps
}: TPropsBaseForm & React.ComponentProps<'form'>) => {
	let content = null;
	let footer = null;

	Children.forEach(children, (child) => {
		if (!isValidElement(child)) return;
		const type = (child as React.ReactElement & { type: { displayName: string } }).type.displayName;

		if (type === 'FormContent') content = child;
		if (type === 'FormFooter') footer = child;
	});

	return (
		<form className={`${styles.form} ${styles[position]}`} {...otherProps}>
			{title && <h4 className='text text_type_main-medium mb-6'>{title}</h4>}
			{content && <div className={styles.form_content}>{content}</div>}
			{footer && <div className={styles.form_footer}>{footer}</div>}
		</form>
	);
};

const LinkGroup = ({ text, linkText, to }: TLinkGroup) => (
	<p className='text text_type_main-default mb-4'>
		<span className={styles.text}>{text}</span>{' '}
		<Link to={to} className={styles.link}>
			{linkText}
		</Link>
	</p>
);
LinkGroup.displayName = 'FormLinkGroup';

const ButtonGroup = ({ children, className = '' }: TChildren & { className?: string }) => (
	<div className={`${styles.button_group} ${className}`}>{children}</div>
);
ButtonGroup.displayName = 'FormButtonGroup';

const ErrorContent = ({ errorMessage }: { errorMessage: string }) => (
	<span className={styles.error_message}>{errorMessage}</span>
);
ErrorContent.displayName = 'ErrorContent';

const SuccessContent = ({ successMessage }: { successMessage: string }) => (
	<span className={styles.success_message}>{successMessage}</span>
);
SuccessContent.displayName = 'SuccessContent';

const Content = ({ children }: TChildren) => <>{children}</>;
Content.displayName = 'FormContent';

const Footer = ({ children }: TChildren) => <>{children}</>;
Footer.displayName = 'FormFooter';

BaseForm.Content = Content;
BaseForm.Footer = Footer;
BaseForm.LinkGroup = LinkGroup;
BaseForm.ButtonGroup = ButtonGroup;
BaseForm.ErrorContent = ErrorContent;
BaseForm.SuccessContent = SuccessContent;

export { BaseForm };
