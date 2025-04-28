import pytest

def test_addition():
    """Test that addition works correctly"""
    assert 1 + 1 == 2

def test_subtraction():
    """Test that subtraction works correctly"""
    assert 5 - 3 == 2

@pytest.mark.parametrize("input_val, expected", [
    (2, 4),
    (3, 9),
    (4, 16),
    (5, 25),
])
def test_squaring(input_val, expected):
    """Test that squaring a number works correctly"""
    assert input_val ** 2 == expected
