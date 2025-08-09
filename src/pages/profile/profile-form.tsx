import styles from './profile.module.css';
import { BaseForm } from '@/components/form/base-form';
import { useForm } from '@/hooks/use-form';
import { useUpdateUserMutation } from '@/services/user/user-api';
import { useAppSelector } from '@/store/hooks';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

const ProfileForm = () => {
	const [editInput, setEditInput] = useState('');
	const [showSuccess, setShowSuccess] = useState(false);
	const user = useAppSelector((state) => state.userSlice.user);
	const [updateUser, { isSuccess, isError }] = useUpdateUserMutation();
	const {
		names,
		values,
		isEqualValues,
		isChangeValue,
		changedValues,
		setValues,
		handleChange,
		handleSubmit,
		reset,
	} = useForm({
		name: user?.name || '',
		email: user?.email || '',
		password: '*******',
	});

	const isFieldEditable = (name: string) => editInput === name;
	const toggleEditInput = (name: string) => setEditInput((prev) => (prev !== name ? name : ''));
	const activeInputClass = (name: string) => (isFieldEditable(name) ? styles.active_input : '');
	const getInputIcon = (name: string) => (isFieldEditable(name) ? 'CloseIcon' : 'EditIcon');
	const handleSubmitForm = handleSubmit(() => updateUser(changedValues));

	const handleRestore = () => {
		reset();
		setEditInput('');
	};

	useEffect(() => {
		if (isSuccess) {
			setShowSuccess(true);
			setEditInput('');
			setValues({ ...values, ...changedValues });
			const timer = setTimeout(() => {
				setShowSuccess(false);
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [isSuccess]);

	return (
		<BaseForm position='auto' onSubmit={handleSubmitForm}>
			<BaseForm.Content>
				<Input
					extraClass={`${styles.input} ${activeInputClass(names.name)}`}
					type='text'
					icon={getInputIcon(names.name)}
					placeholder='Имя'
					name={names.name}
					onIconClick={() => toggleEditInput(names.name)}
					value={values.name}
					readOnly={!isFieldEditable(names.name)}
					onChange={handleChange}
				/>

				<Input
					extraClass={`${styles.input} ${activeInputClass(names.email)}`}
					type='email'
					icon={getInputIcon(names.email)}
					placeholder='E-mail'
					name={names.email}
					onIconClick={() => toggleEditInput(names.email)}
					value={values.email}
					readOnly={!isFieldEditable(names.email)}
					onChange={handleChange}
				/>

				<Input
					extraClass={`${styles.input} ${activeInputClass(names.password)}`}
					type='password'
					icon={getInputIcon(names.password)}
					placeholder='Пароль'
					name={names.password}
					onIconClick={() => toggleEditInput(names.password)}
					value={values.password}
					readOnly={!isFieldEditable(names.password)}
					onChange={handleChange}
				/>
				{showSuccess && <BaseForm.SuccessContent successMessage={'Данные успешно обновлены'} />}
				{isError && !isChangeValue && (
					<BaseForm.ErrorContent errorMessage={'Данные не сохранены'} />
				)}
				<BaseForm.ButtonGroup className={styles.form_buttons}>
					{!isEqualValues && (
						<>
							<Button onClick={handleRestore} htmlType='button' type='secondary'>
								Отмена
							</Button>
							<Button htmlType='submit'>Сохранить</Button>
						</>
					)}
				</BaseForm.ButtonGroup>
			</BaseForm.Content>
		</BaseForm>
	);
};

export default ProfileForm;
