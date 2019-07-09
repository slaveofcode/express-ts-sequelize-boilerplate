import { BAD_REQUEST } from 'http-status-codes';
import HTTPException from './HTTPException';

class BadRequestException extends HTTPException {
  constructor() {
    super(BAD_REQUEST, 'Bad Request');
    this.stack = '';
  }
}

export default BadRequestException;
