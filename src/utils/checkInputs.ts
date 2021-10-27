interface InputsProps {
  password: string;
  name?: string;
  email: string;
  repeatPassword?: string;
}

interface LoginErrorProps {
  email: boolean;
  password: boolean;
}

interface RegistrationErrorProps {
  name: boolean;
  email: boolean;
  password: boolean;
}

const checkInputs = ({
  password,
  name,
  email,
  repeatPassword,
}: InputsProps): [boolean, LoginErrorProps | RegistrationErrorProps] => {
  if (typeof repeatPassword === 'string' && typeof name === 'string') {
    let errors = {
      name: false,
      email: false,
      password: false,
    };
    if (password !== repeatPassword || password.length < 8) {
      errors.password = true;
    }
    if (name.length < 3) {
      errors.name = true;
    }

    if (!email.includes('@')) {
      errors.email = true;
    }

    if (
      errors.name === true ||
      errors.email === true ||
      errors.password === true
    ) {
      return [false, errors];
    } else {
      return [true, errors];
    }
  } else {
    let errors = {
      email: false,
      password: false,
    };
    if (password.length < 8) {
      errors.password = true;
    }

    if (!email.includes('@')) {
      errors.email = true;
    }

    if (errors.email === true || errors.password === true) {
      return [false, errors];
    } else {
      return [true, errors];
    }
  }
};

export default checkInputs;
