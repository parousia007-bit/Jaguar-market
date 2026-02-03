import unittest
from app_simple import app

class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_index(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_dynamic_vendor_tavolos(self):
        response = self.app.get('/bazar/tavolos')
        self.assertEqual(response.status_code, 200)
        # Check for something characteristic of the page
        self.assertTrue(b'Tavolos' in response.data or b'tavolos' in response.data)

    def test_dynamic_vendor_gelee(self):
        response = self.app.get('/bazar/gelee-dely')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(b'Dely' in response.data or b'dely' in response.data)

    def test_dynamic_vendor_dental(self):
        response = self.app.get('/bazar/dental')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Dental', response.data)

    def test_404(self):
        response = self.app.get('/bazar/non_existent')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()
