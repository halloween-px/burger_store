import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Container } from '@/components/container/container';
import { routesConfig } from '@/routes/routesConfig';
import { BaseForm } from '@/components/form/base-form';
import { useLoginMutation } from '@/services/auth/auth-api';
import { useForm } from '@/hooks/use-form';
import { TTypedError } from '@/types/errors';
import { Preloader } from '@/components/preloader/preloader';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
	const navigate = useNavigate();
	const [login, { isError, error, isLoading }] = useLoginMutation();
	const { values, names, isChangeValue, handleChange, handleSubmit } = useForm({
		email: '',
		password: '',
	});

	const err = error as TTypedError;
	const handleFormSubmit = handleSubmit(async (val) => {
		await login(val);
		navigate(routesConfig.MAIN);
	});

	if (isLoading) {
		return (
			<div className='mt-30'>
				<Preloader />
			</div>
		);
	}

	return (
		<section className={'mt-30'}>
			<Container>
				<BaseForm title='Вход' onSubmit={handleFormSubmit}>
					<BaseForm.Content>
						<EmailInput
							value={values.email}
							onChange={handleChange}
							name={names.email}
							placeholder='E-mail'
							isIcon={false}
						/>
						<Input
							value={values.password}
							onChange={handleChange}
							name={names.password}
							type={'password'}
							placeholder={'Пароль'}
							icon={'ShowIcon'}
							error={false}
							onIconClick={() => {}}
							errorText={'Ошибка'}
							size={'default'}
						/>
						<Button htmlType='submit'>Войти</Button>
						{isError && !isChangeValue && <BaseForm.ErrorContent errorMessage={err.data.message} />}
					</BaseForm.Content>
					<BaseForm.Footer>
						<BaseForm.LinkGroup
							text='Вы — новый пользователь?'
							linkText='Зарегистрироваться'
							to={routesConfig.REGISTER}
						/>
						<BaseForm.LinkGroup
							text='Забыли пароль?'
							linkText='Восстановить пароль'
							to={routesConfig.FORGOT_PASSWORD}
						/>
					</BaseForm.Footer>
				</BaseForm>
			</Container>
		</section>
	);
};

export default LoginPage;
