import ProductModel from "../../models/ProductModel.js";
import { publishThumbnailJob } from "../../services/rabbitPublisher.js";

/**
 * @openapi
 * /api/products:
 *   get:
 *     description: Return a list of products
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
export async function list(req, res, next) {
  try {
    const userId = req.apiUserId;
    const filter = {};

    if (req.query.tag) {
      filter.tags = tag;
    }

    if (req.query.min !== undefined || req.query.max !== undefined) {
      filter.price = {};

      if (req.query.min !== undefined)
        filter.price.$gte = Number(req.query.min);
      if (req.query.max !== undefined)
        filter.price.$lte = Number(req.query.max);

      if (Object.keys(filter.price).length === 0) {
        delete filter.price;
      }
    }

    if (req.query.name) {
      filter.name = new RegExp(req.query.name, "i");
    }

    const skip = (parseInt(req.query.page) - 1) * parseInt(req.query.limit);

    const withCount = req.query.count === "true";

    const products = await ProductModel.getAll(
      userId,
      filter,
      skip,
      req.query.limit,
      req.query.sort
    );

    const result = { results: products };

    if (withCount) {
      const count = await ProductModel.countAll(filter);
      result.count = count;
    }

    res.json({ result });
  } catch (err) {
    next(err);
  }
}

export async function getOne(req, res, next) {
  try {
    const userId = req.apiUserId;
    const productId = req.params.productId;

    const product = await ProductModel.getOne(productId, userId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json({ result: product });
  } catch (err) {
    next(err);
  }
}

export async function newProduct(req, res, next) {
  try {
    const userId = req.apiUserId;
    const { name, price, tags } = req.body;
    const product = await ProductModel.createProduct({
      name,
      price,
      tags,
      image: req.file?.filename,
      owner: userId,
    });

    if (req.file?.path) {
      await publishThumbnailJob(req.file.path);
    }

    res.status(201).json({ result: product });
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const userId = req.apiUserId;
    const productId = req.params.productId;

    const productData = req.body;
    productData.image = req.file?.filename;
    const updatedProduct = await ProductModel.save(
      productData,
      productId,
      userId
    );

    if (req.file?.path) {
      await publishThumbnailJob(req.file.path);
    }

    res.json({ result: updatedProduct });
  } catch (err) {
    next(err);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const userId = req.apiUserId;
    const productId = req.params.productId;
    const product = await ProductModel.getOne(productId, userId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    await ProductModel.deleteProductById({
      productId,
      userId,
    });

    res.status(204).json();
  } catch (err) {
    next(err);
  }
}
