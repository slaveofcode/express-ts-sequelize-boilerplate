import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import HTTPException from './HTTPException';

class InternalServerErrorException extends HTTPException {
  constructor(message?: string) {
    super(INTERNAL_SERVER_ERROR, message || 'Server Error');
    this.stack = '';
  }
}

export default InternalServerErrorException;
