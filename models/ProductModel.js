import { Product } from "./Product.js";

class ProductModel {
  static async getFilteredProducts({
    userId,
    tag,
    min,
    max,
    name,
    page = 1,
    limit = 10,
    sort = "name",
  }) {
    const filter = {};

    filter.owner = userId;

    if (tag) {
      filter.tags = tag;
    }

    if (min !== undefined || max !== undefined) {
      filter.price = {};

      if (min !== undefined) filter.price.$gte = Number(min);
      if (max !== undefined) filter.price.$lte = Number(max);

      if (Object.keys(filter.price).length === 0) {
        delete filter.price;
      }
    }

    if (name) {
      filter.name = new RegExp(name, "i");
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const totalProducts = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sort)
      .exec();

    const totalPages = Math.ceil(totalProducts / limit);

    return {
      products,
      totalProducts,
      totalPages,
      currentPage: parseInt(page),
      limit: parseInt(limit),
    };
  }

  static async getAll(filter, skip, limit, sort) {
    const products = await Product.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort(sort)
      .exec();

    return products;
  }

  static async countAll(filter) {
    const count = await Product.countDocuments(filter);
    return count;
  }

  static async getOne(id, userId) {
    return await Product.findOne({
      _id: id,
      owner: userId,
    });
  }

  static async getOneProduct(productId) {
    return await Product.findById(productId)
  }

  static async createProduct({ name, price, tags, image, owner }) {
    const allowedTags = ["work", "lifestyle", "motor", "mobile"];

    const normalizedTags = Array.isArray(tags) ? tags : [tags];
    const filteredTags = normalizedTags.filter((tag) =>
      allowedTags.includes(tag)
    );

    const product = new Product({
      name,
      price,
      tags: filteredTags,
      image,
      owner,
    });

    return await product.save();
  }

  static async newProduct({ name, price, tags, image }) {
    const allowedTags = ["work", "lifestyle", "motor", "mobile"];

    const normalizedTags = Array.isArray(tags) ? tags : [tags];
    const filteredTags = normalizedTags.filter((tag) =>
      allowedTags.includes(tag)
    );

    const product = new Product({
      name,
      price,
      tags: filteredTags,
      image,
    });

    return await product.save();


  }

  static async deleteProductById({ productId, userId }) {
    const product = await Product.findOne({
      _id: productId,
      owner: userId,
    });

    if (!product) {
      return null;
    }

    await product.deleteOne();

    return product;
  }
}

export default ProductModel;
