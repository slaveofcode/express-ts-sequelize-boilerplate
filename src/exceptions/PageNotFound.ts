import { NOT_FOUND } from 'http-status-codes';
import HTTPException from './HTTPException';

class PageNotFoundException extends HTTPException {
  constructor(message?: string) {
    super(NOT_FOUND, message || 'Page not found');
    this.stack = '';
  }
}

export default PageNotFoundException;
