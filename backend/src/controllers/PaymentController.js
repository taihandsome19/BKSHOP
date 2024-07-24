const PaymentService = require('../services/PaymentService');

class PaymentController {
  async createPayment(req, res) {
    try {
      const paymentInfo = req.body;
      const paymentLink = await PaymentService.createPayment(paymentInfo);
      res.status(200).json(paymentLink);
    } catch (error) {
      res.status(500).json({ message: 'Payment creation failed', error });
    }
  }

  async getInfoPayment(req, res) {
    try {
      const id = req.params.id;
      const paymentLink = await PaymentService.getInfoPayment(id);
      res.status(200).json(paymentLink);
    } catch (error) {
      res.status(500).json({ message: 'Get payment failed', error });
    }
  }
}

module.exports = new PaymentController();
