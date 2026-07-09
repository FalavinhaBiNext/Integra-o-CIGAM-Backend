import { UserTypeModel } from '@/database/models/UserType';
import { UserTypeResponseDTO } from '../dto/user-type.dto';

export class UserTypeMapper {
  static toResponse(userType: UserTypeModel) {
    return UserTypeResponseDTO.fromEntity(userType);
  }
}
