import { registerDecorator,ValidationOptions,ValidatorConstraint,ValidatorConstraintInterface } from 'class-validator';
import User from '../../entity/User';
  
@ValidatorConstraint({ async: true })
export class isEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: string): Promise<boolean> {
      return User.findOne({ email: email }).then(user => {
        if (user) return false;
        return true;
      });
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string): void {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: isEmailAlreadyExistConstraint,
      });
    };
}