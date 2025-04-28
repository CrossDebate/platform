import pytest

@pytest.fixture
def sample_data():
    """A fixture providing sample data for tests"""
    return {
        "users": ["user1", "user2", "user3"],
        "values": [10, 20, 30],
        "settings": {
            "debug": True,
            "environment": "testing"
        }
    }
