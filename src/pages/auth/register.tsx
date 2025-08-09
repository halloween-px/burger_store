import { Container } from '@/components/container/container';
import { BaseForm } from '@/components/form/base-form';
import { Preloader } from '@/components/preloader/preloader';
import { useForm } from '@/hooks/use-form';
import { routesConfig } from '@/routes/routesConfig';
import { useRegisterMutation } from '@/services/auth/auth-api';
import { TTypedError } from '@/types/errors';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';

const RegisterPage = () => {
	const [login, { isError, error, isLoading }] = useRegisterMutation();
	const { values, names, isChangeValue, handleChange, handleSubmit } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const err = error as TTypedError;
	const handleFormSubmit = handleSubmit((val) => login(val));

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
				<BaseForm title='Регистрация' onSubmit={handleFormSubmit}>
					<BaseForm.Content>
						<Input
							type={'text'}
							placeholder={'Имя'}
							name={names.name}
							error={false}
							onIconClick={() => {}}
							size={'default'}
							onChange={handleChange}
							value={values.name}
						/>
						<EmailInput
							value={values.email}
							onChange={handleChange}
							placeholder='E-mail'
							name={names.email}
							isIcon={false}
						/>
						<Input
							type={'password'}
							placeholder={'Пароль'}
							icon={'ShowIcon'}
							name={names.password}
							error={false}
							onIconClick={() => {}}
							size={'default'}
							onChange={handleChange}
							value={values.password}
						/>
						<Button htmlType='submit'>Зарегистрироваться</Button>
						{isError && !isChangeValue && <BaseForm.ErrorContent errorMessage={err.data.message} />}
					</BaseForm.Content>
					<BaseForm.Footer>
						<BaseForm.LinkGroup
							text='Уже зарегистрированы?'
							linkText='Войти'
							to={routesConfig.LOGIN}
						/>
					</BaseForm.Footer>
				</BaseForm>
			</Container>
		</section>
	);
};

export default RegisterPage;
