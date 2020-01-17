class UniformGenerator {
  constructor(a, b) {
    this.a = Number(a) - Number(b);
    this.b = Number(a) + Number(b);
  }

  get getNext() {
    return Math.random()*(this.b - this.a) + this.a;
  }
}

class RequestGenerator {
  constructor(generator) {
    this._generator = generator;

    this._queue = [];
    // сгенерированные запросы
    this._requests = 0;
    // время до следующего запроса
    this._next_event_time = 0;
  }

  set next_event_time(time) {
    // console.log(time);
    this._next_event_time = time;
  }

  get next_event_time() {
    return this._next_event_time;
  }

  get requests() {
    return this._requests;
  }

  set add_queue(queue) {
    // не уверена что это работает
    if (!this._queue.includes(queue)) {
      this._queue.push(queue);
    }
  }

  remove_queue(queue) {
    // не уверена что работает
    this._queue.splice(this._queue.indexOf(queue), 1);
    // наверное тут нужна проверка если нет такого элемента
  }

  get generate_time() {
    // console.log(this._generator.getNext);
    return this._generator.getNext;
  }

  send_request() {
    this._requests += 1;
    for (let queue of this._queue) {
      // console.log(queue);
      if (queue.receive_request) {
        return queue;
      }
    }
    // for in else
    return null;
  }
}

class RequestHandler extends RequestGenerator{
  constructor(generator, max_size = 0, reprocess = 0) {
    super();
    // мб тут нужен super
    this._generator = generator;
    // текущий размер очереди
    this._request_queue = 0;
    // максимальный размер очереди
    // если = 0, то длина очереди не ограничена, если 1 и больше, то 1 ии больше
    this._max_size = max_size;
    // общий размер обработанной очереди
    this._queue_size = max_size;
    // 
    this._requests = 0;
    // вероятность повторной обработки заявки
    this._reprocess = reprocess;
    // количество повторных заявок
    this._reprocess_requests = 0;
  }

  get requests() {
    return this._requests;
  }

  get queue_size() {
    // общий размер очереди
    return this._queue_size;
  }

  set queue_size(size) {
    this._queue_size = size;
  }

  get request_queue() {
    return this._request_queue;
  }

  get reprocess_requests() {
    return this._reprocess_requests;
  }

  process() {
    if (this._request_queue > 0) {
      this._request += 1;
      this._request_queue -= 1;
      this.send_request();
      // if (Math.random() < this._reprocess) {
      //   this._reprocess_requests += 1;
      //   this.receive_request;
      // }
    }
  }

  get receive_request() {
    // если максимальный размер очередии не ограничен, то
      // если текущий размер очереди больше или равен, чем размер обработанной очереди, то
        // размер обработанной очереди += 1
      // текущий размер очереди += 1
    // иначе если текущй размер очереди меньше чем размер обработанной очереди, то
      // текущий размер очереди += 1
    if (this._max_size == 0) {
      // console.log('MAX_SIZE  ' + this._request_queue + ' ' + this._queue_size);
      if (this._request_queue >= this._queue_size) {
        this._queue_size += 1;
      }
      this._request_queue += 1;
      // console.log(111111111111111);
      return true;
    } else if (this._request_queue < this._queue_size) {
      this._request_queue += 1;
      // console.log(222222222222222);
      return true;
    }
    // console.log(33333333333);
    return false;
  }
}

class CompGenerator {
  constructor(value) {
    this._value = value;
  }

  get next() {
    return this._value;
  }
}

function modelling() {
  const count_requests = Number($("#count_requests").val());
  const request_client = Number($("#request_client").val());
  const dt_request_client = Number($("#dt_request_client").val());

  const request_op0 = Number($("#request_op0").val());
  const dt_request_op0 = Number($("#dt_request_op0").val());
  const request_op1 = Number($("#request_op1").val());
  const dt_request_op1 = Number($("#dt_request_op1").val());
  const request_op2 = Number($("#request_op2").val());
  const dt_request_op2 = Number($("#dt_request_op2").val());

  const request_comp0 = Number($("#request_comp0").val());
  const request_comp1 = Number($("#request_comp1").val());

  console.log(count_requests, request_client, dt_request_client);
  console.log(request_op0, dt_request_op0, request_op1, dt_request_op1, request_op2, dt_request_op2);
  console.log(request_comp0, request_comp1);

  let client_generation = new RequestGenerator(new UniformGenerator(request_client, dt_request_client));
  
  let op0 = new RequestHandler(new UniformGenerator(request_op0, dt_request_op0), max_size = 1);
  let op1 = new RequestHandler(new UniformGenerator(request_op1, dt_request_op1), max_size = 1);
  let op2 = new RequestHandler(new UniformGenerator(request_op2, dt_request_op2), max_size = 1);

  let comp0 = new RequestHandler(new CompGenerator(request_comp0));
  let comp1 = new RequestHandler(new CompGenerator(request_comp1));

  // console.log(client_generation);
  // console.log(op0);
  // console.log(comp0);

  // добавление "зависимости"
  client_generation.add_queue = op0;
  client_generation.add_queue = op1;
  client_generation.add_queue = op2;
  op0.add_queue = comp0;
  op1.add_queue = comp0;
  op2.add_queue = comp1;

  const apparatus = [client_generation, op0, op1, op2, comp0, comp1];
  console.log(apparatus);
  for (apparat of apparatus) {
    apparat.next_event_time = 0;
  }

  // отказ
  let rejection_request = 0;

  // генерация времени для первой заявки и первого оператора
  client_generation.next_event_time = client_generation.generate_time;
  op0.next_event_time = op0.generate_time;

  while (client_generation.requests < count_requests) {
    let current_time = client_generation.next_event_time;
    for (apparat of apparatus) {
      if (0 < apparat.next_event_time && apparat.next_event_time < current_time) {
        current_time = apparat.next_event_time;
      }
    }

    for (apparat of apparatus) {
      if (current_time == apparat.next_event_time) {
        if (!(apparat instanceof RequestHandler)) {
          // попытка отправки заявки, внутри проверяется может ли быть заявка отправлена или будет отказ
          let processor = client_generation.send_request();
          if (processor) {
            // если заявка отправлена, то следующая заявка этого процесса = текущее время + рандомное
            processor.next_event_time = current_time + processor.generate_time;
          } else {
            // иначе количество отказов += 1
            // и вычисляется время следующей генерации заявки
            rejection_request += 1;
            client_generation.next_event_time = current_time + client_generation.generate_time;
          }
        } else {
          apparat.process();
          if (apparat.request_queue == 0) {
            apparat.next_event_time = 0;
          } else {
            apparat.next_event_time = current_time + apparat.generate_time;
          }
        }
      }
    }
  }
  console.log(rejection_request/count_requests);
  $("#probability_failure").val((rejection_request/count_requests).toFixed(3));
}