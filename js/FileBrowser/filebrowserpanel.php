<?php

// test failure
//header('HTTP/1.1 404 Not Found'); exit;

include_once '../../php/libs/fb/fb.php';

//$basePath = realpath(dirname(__FILE__ ) . '/data') . '/';
$basePath = realpath(dirname(__FILE__ ) . '../../../_FILES/') . '/';
$action = $_POST['action'];

switch($action) {
	
	case 'get-folders':
		$requestedPath = $_POST['path'];
		$browsePath = preg_replace('/^\/Root\/?/', $basePath, $requestedPath) . '/';
		
		$dirs = array();
		$iterator = new DirectoryIterator($browsePath);
		
		foreach($iterator as $item) {
			if(!$item->isDot() && $item->isDir()) {
				$dirs[(string) $item] = array(
					'text' => (string) $item,
					'leaf' => false
				);
			}
		}
		
		uksort($dirs, 'strcasecmp');
		$success = true;
		$data = array_values($dirs);
	break;

	case 'get-files':
		$requestedPath = $_POST['path'];
		$browsePath = preg_replace('/^\/Root\/?/', $basePath, $requestedPath) . '/';
		
		$rowClasses = array(
			'7z'	=> 'ux-filebrowser-icon-archive-file',
			'aac'	=> 'ux-filebrowser-icon-audio-file',
			'ai'	=> 'ux-filebrowser-icon-vector-file',
			'avi'	=> 'ux-filebrowser-icon-video-file',
			'bmp'	=> 'ux-filebrowser-icon-image-file',
			'divx'	=> 'ux-filebrowser-icon-video-file',
			'doc'	=> 'ux-filebrowser-icon-document-file',
			'eps'	=> 'ux-filebrowser-icon-vector-file',
			'flac'	=> 'ux-filebrowser-icon-audio-file',
			'flv'	=> 'ux-filebrowser-icon-video-file',
			'gif'	=> 'ux-filebrowser-icon-image-file',
			'jpg'	=> 'ux-filebrowser-icon-image-file',
			'mov'	=> 'ux-filebrowser-icon-video-file',
			'mp3'	=> 'ux-filebrowser-icon-audio-file',
			'mpg'	=> 'ux-filebrowser-icon-video-file',
			'pdf'	=> 'ux-filebrowser-icon-acrobat-file',
			'png'	=> 'ux-filebrowser-icon-image-file',
			'pps'	=> 'ux-filebrowser-icon-presentation-file',
			'ppt'	=> 'ux-filebrowser-icon-presentation-file',
			'rar'	=> 'ux-filebrowser-icon-archive-file',
			'psd'	=> 'ux-filebrowser-icon-image-file',
			'svg'	=> 'ux-filebrowser-icon-vector-file',
			'swf'	=> 'ux-filebrowser-icon-flash-file',
			'tif'	=> 'ux-filebrowser-icon-image-file',
			'txt'	=> 'ux-filebrowser-icon-text-file',
			'wav'	=> 'ux-filebrowser-icon-audio-file',
			'wma'	=> 'ux-filebrowser-icon-video-file',
			'xls'	=> 'ux-filebrowser-icon-spreadsheet-file',
			'zip'	=> 'ux-filebrowser-icon-archive-file'
		);
		
		$files = array();
		$iterator = new DirectoryIterator($browsePath);
		foreach($iterator as $item) {
			if($item->isFile()) {
				$files[(string) $item] = array(
					'name' => (string) $item,
					'size' => $item->getSize(),
					'type' => $item->getType(),
					'date_modified' => $item->getMTime()
				);
				
				$ext = pathinfo($item->getFilename(), PATHINFO_EXTENSION);
				$thumb = 'file_' . $ext . '.png';
				if(file_exists('media/icons/48/' . $thumb) == true) {
					$files[(string) $item]['thumbnail'] = 'media/icons/48/' . $thumb;
				}
				
				if(array_key_exists($ext, $rowClasses) == true) {
					$files[(string) $item]['row_class'] = $rowClasses[$ext];
				}
			}
		}
		
		uksort($files, 'strcasecmp');
		$success = true;
		$data = array(
			'success'	=> $success,
			'data'		=> array_values($files)
		);
	break;

	case 'delete-file':
		$files = $_POST['files'];
		$requestedPath = $_POST['path'];		
		$deletePath = preg_replace('/^\/Root\/?/', $basePath, $requestedPath);			
		
		$success = true;
		$failCount = 0;
		$message = '';
		$data = array(
			'successful' => array(),
			'failed' => array()
		);
		
		foreach($files as $recordId => $file) {
		
			$filePath = preg_replace('/^\/Root\/?/', $basePath, $file);
			try {
				if(file_exists($filePath) == false) {
					throw new Exception("The file '" . basename($filePath) . "' does not exist");
				}
				if(is_file($filePath) == false) {
					throw new Exception("'" . htmlspecialchars($filePath) . "' is not a file");
				}
				if(is_writable($filePath) == false) {
					throw new Exception("You do not have permission to delete '" . basename($filePath) . "'");
				}
				if(@unlink($filePath) == false) {
					throw new Exception("Could not delete '" . basename($filePath) . "' for unknow reason");
				} else {
					$data['successful'][] = array(
						'recordId' => $recordId
					);
				}
			} catch(Exception $e) {
				$success = false;
				$failCount++;
				$data['failed'][] = array(
					'recordId' => $recordId,
					'reason' => $e->getMessage()
				);
			}
		}
		
		if($failCount > 0) {
			$message = 'Failed to delete ' . (integer) $failCount . ' file(s)';
		}
				
		$data = array(
			'success'	=> $success,
			'message'	=> $message,
			'data'		=> $data
		);		
		
	break;

	case 'rename-file':
		$requestedPath = $_POST['path'];
		$oldName = $_POST['oldName'];
		$newName = $_POST['newName'];
		$renamePath = preg_replace('/^\/Root\/?/', $basePath, $requestedPath);
		
		$success = true;
		$message = '';
		
		try {
			if(file_exists($renamePath . $oldName) == false) {
				throw new Exception("The file '" . htmlspecialchars($oldName) . "' does not exist");
			}
			if(is_file($renamePath . $oldName) == false) {
				throw new Exception("'" . htmlspecialchars($oldName) . "' is not a file");
			}
			if(is_writable($renamePath . $oldName) == false) {
				throw new Exception("You do not have permission to rename '" . htmlspecialchars($oldName) . "'");
			}
			if(file_exists($renamePath . $newName) == true) {
				throw new Exception("Could not rename '" . htmlspecialchars($oldName) . "'. A file or folder with the specified name already exists");
			}
			if(@rename($renamePath . $oldName, $renamePath . $newName) == false) {
				throw new Exception("Could not rename '" . htmlspecialchars($oldName) . "' for unknow reason");
			}
		} catch(Exception $e) {
			$success = false;
			$message = $e->getMessage();
		}
		
		$data = array(
			'success'	=> $success,
			'message'	=> $message
		);
	break;

	case 'upload-file':
				
		
	break;
	
	case 'download-file':
		$requestedPath = $_POST['path'];
		$downloadPath = preg_replace('/^\/Root\/?/', $basePath, $requestedPath);
		
		try {
			if(file_exists($downloadPath) == false) {
				throw new Exception("The file '" . basename($downloadPath) . "' does not exist");
			}
			if(is_file($downloadPath) == false) {
				throw new Exception("'" . htmlspecialchars($requestedPath) . "' is not a file");
			}
			if(is_readable($downloadPath) == false) {
				throw new Exception("You do not have permission to download '" . basename($downloadPath) . "'", 1);
			}
			
			header('Pragma: public');
			header('Expires: 0');
			header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
			header('Content-Description: File Transfer');
			header('Content-Type: application/force-download');
			header('Content-Disposition: attachment; filename="' . basename($downloadPath) . '"');
			header('Content-Transfer-Encoding: binary');
			header('Content-Length: ' . filesize($downloadPath));
			
			readfile($downloadPath);
		} catch(Exception $e) {
			if($e->getCode() === 1) {
				header('HTTP/1.1 403 Forbidden');
			} else {
				header('HTTP/1.1 404 Not Found');
			}
			echo $e->getMessage();
		}
		
		exit;
	break;

	case 'move-file':
		
		$sourcePath = $_POST['sourcePath'];
		$destinationPath = $_POST['destinationPath'];
		$files = $_POST['files'];
		$overwrite = $_POST['overwrite'];
		$overwrite = ($overwrite === 'true') ? true : false;
		
		$sourceFolder = preg_replace('/^\/Root\/?/', $basePath, $sourcePath) . '/';
		$destinationFolder = preg_replace('/^\/Root\/?/', $basePath, $destinationPath) . '/';
		
		$success = true;
		$failCount = 0;
		$message = '';
		$data = array(
			'successful' => array(),
			'failed' => array(),
			'existing' => array()
		);
		
		foreach($files as $recordId => $fileName) {
			
			$from = $sourceFolder . $fileName;
			$to = $destinationFolder . $fileName;
			
			try {
				
				if(file_exists($from) == false) {
					throw new Exception("The file '" . htmlspecialchars($fileName) . "' does not exist");
				}
				if(is_file($from) == false) {
					throw new Exception("'" . htmlspecialchars($fileName) . "' is not a file");
				}
				if(is_readable($from) == false) {
					throw new Exception("'" . htmlspecialchars($fileName) . "' is not readable");
				}
				
				if(file_exists($destinationFolder) == false) {
					throw new Exception("The destination folder '" . htmlspecialchars($destinationPath) . "' does not exist");
				}
				if(is_dir($destinationFolder) == false) {
					throw new Exception("The destination folder '" . htmlspecialchars($destinationPath) . "' is not a directory");
				}
				if(is_writable($destinationFolder) == false) {
					throw new Exception("You do not have permission to move files to '" . htmlspecialchars($destinationPath) . "'");
				}
				
				if($overwrite === true) {
					if(file_exists($to) == true && is_writable($to) == false) {
						throw new Exception("You do not have permission to overwrite '" . htmlspecialchars($fileName) . "'");
					}
				} else {
					if(file_exists($to) == true) {
						throw new Exception("Could not move '" . htmlspecialchars($fileName) . "'. A file with the same name in the destination folder already exists", 1);
					}
				}
				
				if(@rename($from, $to) == false) {
					throw new Exception("Could not move '" . htmlspecialchars($fileName) . "' for unknown reason");
				} else {
					$data['successful'][] = array(
						'recordId' => $recordId
					);
				}
				
			} catch(Exception $e) {
				$success = false;
				$failCount++;
				
				if($e->getCode() === 1) {
					$data['existing'][] = array(
						'recordId' => $recordId,
						'reason' => $e->getMessage()
					);
				} else {
					$data['failed'][] = array(
						'recordId' => $recordId,
						'reason' => $e->getMessage()
					);
				}
			}
		}
		
		if($failCount > 0) {
			$message = 'Failed to move ' . (integer) $failCount . ' file(s)';
		}
		
		$data = array(
			'success'	=> $success,
			'message'	=> $message,
			'data'		=> $data
		);
	break;

	case 'create-folder':
		$requestedPath = $_POST['path'];
		$createPath = preg_replace('/^\/Root\/?/', $basePath, $requestedPath);
		
		$success = true;
		$message = '';
		
		try {
			$parentPath = realpath( realpath($createPath) . '/../');
			if(file_exists($parentPath) == false) {
				throw new Exception("Could not create '" . htmlspecialchars($requestedPath) . "', the parent folder does not exist");
			}
			if(is_dir($parentPath) == false) {
				throw new Exception("Could not create '" . htmlspecialchars($requestedPath) . "', the parent folder is not a directory");
			}
			if(is_writable($parentPath) == false) {
				throw new Exception("You do not have permission to create '" . htmlspecialchars($createPath) . "'");
			}
			if(file_exists($createPath) == true) {
				throw new Exception("Could not create '" . htmlspecialchars($createPath) . "'. A file or folder with the specified name already exists");
			}
			if(@mkdir($createPath) == false) {
				throw new Exception("Could not create '" . htmlspecialchars($requestedPath) . "' for unknow reason");
			}
		} catch(Exception $e) {
			$success = false;
			$message = $e->getMessage();
		}
		
		$data = array(
			'success'	=> $success,
			'message'	=> $message
		);
	break;

	case 'rename-folder':
		$requestedPath = $_POST['path'];
		$oldName = $_POST['oldName'];
		$newName = $_POST['newName'];
		$renamePath = preg_replace('/^\/Root\/?/', $basePath, $requestedPath) . '/';

		$success = true;
		$message = '';
		
		try {
			if(file_exists($renamePath . $oldName) == false) {
				throw new Exception("The folder '" . htmlspecialchars($oldName) . "' does not exist");
			}
			if(is_dir($renamePath . $oldName) == false) {
				throw new Exception("'" . htmlspecialchars($oldName) . "' is not a directory");
			}
			if(is_writable($renamePath . $oldName) == false) {
				throw new Exception("You do not have permission to rename '" . htmlspecialchars($oldName) . "'");
			}
			if(file_exists($renamePath . $newName) == true) {
				throw new Exception("Could not rename '" . htmlspecialchars($oldName) . "'. A file or folder with the specified name already exists");
			}
			if(@rename($renamePath . $oldName, $renamePath . $newName) == false) {
				throw new Exception("Could not rename '" . htmlspecialchars($oldName) . "' for unknow reason");
			}
		} catch(Exception $e) {
			$success = false;
			$message = $e->getMessage();
		}
		
		$data = array(
			'success'	=> $success,
			'message'	=> $message
		);
	break;

	case 'delete-folder':
		$requestedPath = $_POST['path'];
		$deletePath = preg_replace('/^\/Root\/?/', $basePath, $requestedPath);
		
		$success = true;
		$message = '';
		
		try {
			if(file_exists($deletePath) == false) {
				throw new Exception("The folder '" . htmlspecialchars($requestedPath) . "' does not exist");
			}
			if(is_dir($deletePath) == false) {
				throw new Exception("'" . htmlspecialchars($requestedPath) . "' is not a directory");
			}
			if(is_writable($deletePath) == false) {
				throw new Exception("You do not have permission to delete '" . htmlspecialchars($requestedPath) . "'");
			}
			if(count(scandir($deletePath)) > 2) {
				throw new Exception("Could not delete '" . htmlspecialchars($requestedPath) . "', the folder is not empty");
			}
			if(@rmdir($deletePath) == false) {
				throw new Exception("Could not delete '" . htmlspecialchars($requestedPath) . "' for unknown reason");
			}
		} catch(Exception $e) {
			$success = false;
			$message = $e->getMessage();
		}
		
		$data = array(
			'success'	=> $success,
			'message'	=> $message
		);
	break;
	
	default:
		$data = array(
			'success'	=> false,
			'message'	=> 'Unknown action'
		);
	
	break;
}

header('Content-Type: application/json');
echo json_encode($data);
