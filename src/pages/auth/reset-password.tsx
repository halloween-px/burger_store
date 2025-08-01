import { Container } from '@/components/container/container';
import { BaseForm } from '@/components/form/base-form';
import { Preloader } from '@/components/preloader/preloader';
import { useForm } from '@/hooks/use-form';
import { routesConfig } from '@/routes/routesConfig';
import { useResetPasswordMutation } from '@/services/auth/auth-api';
import { TTypedError } from '@/types/errors';
import { routerState } from '@/utils/router-state';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [forgotPassword, { isError, isLoading, isSuccess, error }] = useResetPasswordMutation();
	const { names, handleChange, values, handleSubmit, isChangeValue, reset } = useForm({
		password: '',
		token: '',
	});

	const err = error as TTypedError;
	const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const handleSubmitForm = handleSubmit(async (values) => {
		await forgotPassword(values);
		reset();
	});

	useEffect(() => {
		if (isSuccess) {
			redirectTimeoutRef.current = setTimeout(() => {
				navigate(routesConfig.LOGIN);
			}, 2000);
		}
	}, [isSuccess, navigate]);

	useEffect(() => {
		return () => {
			if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
		};
	}, [isSuccess]);

	if (!location.state?.[routerState.fromForgot]) {
		return <Navigate to={routesConfig.FORGOT_PASSWORD} />;
	}
	if (isLoading) return <Preloader />;

	return (
		<section className={'mt-30'}>
			<Container>
				<BaseForm title='Восстановление пароля' onSubmit={handleSubmitForm}>
					<BaseForm.Content>
						<Input
							type={'password'}
							placeholder={'Введите новый пароль'}
							icon={'ShowIcon'}
							name={names.password}
							error={false}
							size={'default'}
							onChange={handleChange}
							value={values.password}
						/>
						<Input
							type={'text'}
							placeholder={'Введите код из письма'}
							name={names.token}
							error={false}
							size={'default'}
							onChange={handleChange}
							value={values.token}
						/>
						<Button htmlType='submit'>Восстановить</Button>
						{isSuccess && <BaseForm.SuccessContent successMessage={'Данные успешно обновлены'} />}
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

export default ResetPasswordPage;
