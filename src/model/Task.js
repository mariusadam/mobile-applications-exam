import dateFormat from 'dateformat';

const DATE_FORMAT = 'dddd, mmmm dS, yyyy';
const STATUSES = {
  todo: 'Todo',
  inProgress: 'In progress',
  done: 'Done',
};

class Task {
  constructor({id, title, status, deadlineDate}) {
    this.id = id;
    this.title = title;
    this.status = status;
    this.deadlineDate = deadlineDate;
  }

  static empty() {
    return new Task({
      title: '',
      status: STATUSES.todo,
      deadlineDate: new Date(),
    });
  }

  static unserialize(dto) {
    return new Task({
      ...dto,
      deadlineDate: new Date(dto.deadlineDate),
    });
  }

  formattedDate() {
    return dateFormat(
        this.deadlineDate,
        DATE_FORMAT,
    );
  }

  withProp({prop, value}) {
    console.log('Updating task ' + this.title, prop, value);

    return new Task({...this, [prop]: value});
  }

  serialize() {
    const serialized = {...this, deadlineDate: this.deadlineDate.getTime()};
    if (typeof serialized.id === 'undefined') {
      delete serialized.id;
    }

    return serialized;
  }

  statusLabel() {
    return STATUSES[this.status];
  }

  static statusesMap() {
    return STATUSES;
  }
}

export default Task;