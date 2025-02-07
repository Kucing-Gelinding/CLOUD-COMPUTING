# utils.py
import numpy as np
from PIL import Image
from io import BytesIO

def load_image_into_numpy_array(data):
    """
    Load image data into a numpy array.
    """
    return np.array(Image.open(BytesIO(data)))
