class Todo {
  data = [];

  async find(filter) {
    return this.data.filter(filter);
  }

  async findOne(filter) {
    return this.data.find(filter);
  }

  async save(data) {
    this.data.push(data);
    return data;
  }

  async findByIdAndUpdate(id, data, options = {}) {
    let dataRow = null;
    if (id) {
      const dataRowIndex = this.data.findIndex((data) => data.id === +id);
      if (dataRowIndex === -1 && options?.new === true) {
        this.data.push({
          id: +id,
          ...data,
          created_date: new Date(),
        });

        dataRow = this.data.slice(-1);
      } else if (dataRowIndex > -1) {
        dataRow = this.data[dataRowIndex];
        this.data[dataRowIndex] = {
          ...dataRow,
          ...data,
        };

        dataRow = this.data[dataRowIndex];
      }
    }

    return dataRow;
  }

  async findByIdAndRemove(id) {
    let elementIndex = this.data.findIndex((element) => element.id === +id);
    if (elementIndex > -1) {
      return this.data.splice(elementIndex, 1);
    }

    throw new Error("No record found!");
  }
}

module.exports = new Todo();
