import { BAD_REQUEST } from 'http-status-codes';
import HTTPException from './HTTPException';

class BadRequestException extends HTTPException {
  constructor(message?: string) {
    super(BAD_REQUEST, message || 'Bad Request');
    this.stack = '';
  }
}

export default BadRequestException;
