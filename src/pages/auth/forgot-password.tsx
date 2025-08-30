import { Container } from '@/components/container/container';
import { BaseForm } from '@/components/form/base-form';
import { Preloader } from '@/components/preloader/preloader';
import { useForm } from '@/hooks/use-form';
import { routesConfig } from '@/routes/routesConfig';
import { useForgotPasswordMutation } from '@/services/auth/auth-api';
import { TTypedError } from '@/types/errors';
import { routerState } from '@/utils/router-state';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
	const navigate = useNavigate();
	const [forgotPassword, { isError, isLoading, isSuccess, error }] = useForgotPasswordMutation();
	const { names, handleChange, values, handleSubmit, isChangeValue } = useForm({
		email: '',
	});

	const err = error as TTypedError;
	const handleSubmitForm = handleSubmit((values) => forgotPassword(values));

	useEffect(() => {
		if (isSuccess) {
			navigate(routesConfig.RESET_PASSWORD, { state: { [routerState.fromForgot]: true } });
		}
	}, [isSuccess, navigate]);

	if (isLoading) return <Preloader isFull />;

	return (
		<section className={'mt-30'}>
			<Container>
				<BaseForm title='Восстановление пароля' onSubmit={handleSubmitForm}>
					<BaseForm.Content>
						<EmailInput
							value={values.email}
							onChange={handleChange}
							placeholder='Укажите свой е-mail'
							name={names.email}
							isIcon={false}
						/>
						<Button htmlType='submit'>Восстановить</Button>
						{isError && !isChangeValue && <BaseForm.ErrorContent errorMessage={err.data.message} />}
					</BaseForm.Content>
					<BaseForm.Footer>
						<BaseForm.LinkGroup text='Вспомнили пароль?' linkText='Войти' to={routesConfig.LOGIN} />
					</BaseForm.Footer>
				</BaseForm>
			</Container>
		</section>
	);
};

export default ForgotPasswordPage;
