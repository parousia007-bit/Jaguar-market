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

    def test_redirect_unknown(self):
        # Should redirect to index instead of 404
        response = self.app.get('/unknown_vendor')
        self.assertEqual(response.status_code, 302)
        self.assertTrue('/' in response.headers['Location'])

    def test_direct_route_tavolos(self):
        # Tavolos was removed in the cleanup, checking for one of the new vendors
        response = self.app.get('/aura-joyeria')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(b'Aura' in response.data)

    def test_pizzerias_route(self):
        response = self.app.get('/pizzerias')
        self.assertEqual(response.status_code, 200)

    def test_vendor_botanica(self):
        # Test one of the new vendors
        response = self.app.get('/botanica-urbana')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(b'Bot' in response.data)

if __name__ == '__main__':
    unittest.main()
