class Good {
    constructor(id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(value) {
        this.available = value;
    }

  /*
   * Опишите объект Товар посредством классов в JavaScript.
   * При инициализации нового объекта Товар через ключевое
   * слово new в коструктор необходимо передавать:
   *   - id           (свойство идентификатора товара типа number)
   *   - name         (свойство названия товара типа string)
   *   - description  (свойство описания товара типа string)
   *   - sizes        (свойство размеров в виде массива со
   *                   значениями типа string или number)
   *   - price        (свойство цены товара типа number)
   *   - available    (свойство доступности товара типа boolean)
   * Объекты типа Товар должны иметь один метод - setAvailable.
   * Данный метод должен принимать в качестве аргумента булево
   * значение и устанавивать это значение в свойство available.
   * В качестве результата ничего не возвращать.
   */
}

class GoodsList {
    #goods = [];
    filter = null;
    sortPrice = false;
    sortDir = true;


    get list() {
        let filteredGoods = this.#goods.filter(good => good.available);
    
        if (this.filter) {
            const regex = new RegExp(this.filter, 'i');
            filteredGoods = filteredGoods.filter(good => regex.test(good.name));
        }
    
        if (this.sortPrice) {
            filteredGoods.sort((a, b) => {
                if (this.sortDir) {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        }
    
        return filteredGoods.length > 0 ? filteredGoods : this.#goods;
    }

    add(good) {
        if (!this.#goods.some(existingGood => existingGood.id === good.id)) {
            this.#goods.push(good);
        }
    }

    remove(id) {
        const index = this.#goods.findIndex(good => good.id === id);
        if (index !== -1) {
            this.#goods.splice(index, 1);
        }
    }
  /*
   * Опишите объект Список Товаров посредством классов в JavaScript.
   * При инициализации нового объекта Список Товаров через ключевое
   * слово new в коструктор ничего передавать не надо. Объект типа
   * GoodsList должен содержать в себе:
   * - #goods - скрытое извне свойство, которое будет содержать
   *   все товары типа Good
   * - filter - свойство, которому в процессе использования объекта
   *   типа GoodsList может быть присвоено значение регулярного
   *   выражения. Данное свойство может быть использовано при
   *   фильтрации товаров по имени.
   * - sortPrice - свойство, которому в процессе использования объекта
   *   типа GoodsList может быть присвоено булево значение. По умолчанию,
   *   установить значение свойства в false. Данное свойство должно
   *   быть использовано при определении - необходимо сортировать
   *   товары по цене или нет (true - сортировать по цене,
   *   false - не сортировать по цене).
   * - sortDir - свойство, которому в процессе использования объекта
   *   типа GoodsList может быть присвоено булево значение. По умолчанию
   *   установить значение свойства в true. Данное свойство должно
   *   быть использовано при направлении сортировки товаров по цене
   *   (true - сортировать по возрастанию, false - сортировать по
   *   убыванию). Данное свойство примениме только в том случае если
   *   свойство sortPrice установлено в true.
   * - list - "геттер", который должен возвращать список товаров:
   *   1) отфильтрованный по доступности товаров (good.available)
   *   2) отфильтрованный по имени, если задано регулярное выражение
   *      для свойства filter
   *   3а) отсортирован по возрастанию, если свойство sortPrice установлено
   *       в true и свойство sortDir установлено в true
   *   3б) отсортирован по убыванию, если свойство sortPrice установлено
   *       в true и свойство sortDir установлено в false
   * - add - метод, который добавляет товар в список. В качестве параметра метод
   *   должен принимать объект типа Good. В случае наличия товара в списке
   *   переданный товар не добавлять. В качестве результата ничего не возвращать.
   * - remove - метод, который удаляет товар из списка. В качестве параметра метод
   *   принимает идентификатор товара. В случае наличия товара в списке товар
   *   необходимо удалить из списка. В качестве результата ничего не возвращать.
   */
}

/*
 * Необходимо описать класс Товар в Корзине. Данный класс должен содержать
 * такие же свойства, как и у класса Good. Поэтому класс BasketGood должен
 * наследоваться от Good (быть дочерним). Также данный класс должен описывать
 * дополнительное свойство amount (количество). При инициализации экземпляра
 * класса BasketGood через ключевое слово new в конструктор (в качестве
 * параметров) необходимо передать:
 * - good - экземпляр (объект) типа Good
 * - amount - количество товаров типа number
 */
class BasketGood extends Good {
    constructor(good, amount) {
        super(good.id, good.name, good.description, good.sizes, good.price, good.available);
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }

    get totalAmount() {
        return this.goods.reduce((total, basketGood) => total + basketGood.amount, 0);
    }

    get totalSumm() {
        return this.goods.reduce((total, basketGood) => total + basketGood.amount * basketGood.price, 0);
    }

    add(good, amount) {
        const existingGood = this.goods.find(basketGood => basketGood.id === good.id);

        if (existingGood) {
            existingGood.amount += amount;
        } else {
            const newBasketGood = new BasketGood(good, amount);
            this.goods.push(newBasketGood);
        }
    }

    remove(good, amount) {
        const existingGood = this.goods.find(basketGood => basketGood.id === good.id);

        if (existingGood) {
            if (existingGood.amount >= amount) {
                existingGood.amount -= amount;
                if (existingGood.amount === 0) {
                    const index = this.goods.indexOf(existingGood);
                    this.goods.splice(index, 1);
                }
            } else {
                console.log("The specified amount exceeds the available quantity in the basket.");
            }
        } else {
            console.log("The specified good is not in the basket.");
        }
    }

    clear() {
        this.goods = [];
    }

    removeUnavailable() {
        this.goods = this.goods.filter(basketGood => basketGood.available);
    }
  /*
   * Необходимо описать класс Корзина. При инициализации нового
   * объекта Корзина через ключевое слово new в коструктор ничего
   * не передавать. Объект типа Basket должен содержать в себе:
   * - goods - свойство, которое будет содержать все товары типа
   *   BasketGood.
   * - totalAmount - "геттер", который должен возвращать общее
   *   количество всех товаров в корзине.
   * - totalSumm - "геттер", который должен возвращать общую
   *   стоимость всех товаров в корзине.
   * - add - метод, который добавляет новый товар типа BasketGood
   *   в корзину, если такого товара еще нет в корзине, иначе
   *   увеличивает количество существующего товара в корзине.
   *   В качестве параметров метод принимает товар типа Good и
   *   количество типа number. В качестве результата метод ничего
   *   не возвращает.
   * - remove - метод, который удаляет товар типа BasketGood из корзины,
   *   если значение amount больше или равно количеству товаров в корзине.
   *   В противном случае метод уменьшает количество товаров в корзине.
   *   В качестве параметров метод принимает товар типа Good и количество
   *   типа number. В качестве результата метод ничего не возвращает.
   * - clear - метод, который удаляет все товары из корзины. В качестве
   *   параметров метод ничего не принимает. В качестве результата метод
   *   ничего не возвращает.
   * - removeUnavailable - метод, который удаляет недоступные товары.
   *   В качестве параметров метод ничего не принимает. В качестве
   *   результата метод ничего не возвращает.
   */
}

export { Good, GoodsList, BasketGood, Basket };